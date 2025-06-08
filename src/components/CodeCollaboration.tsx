"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

// Define a session data interface for type safety
interface SessionData {
  roomId: string;
  isCollaborating: boolean;
  username: string;
  activeUsers: string[];
  chatMessages: {user: string; message: string; timestamp: string}[];
  code: string;
  language: string;
  outputResult: string;
}

// Interface for collaboration room
interface CollabRoom {
  id: string;
  code: string;
  language: string;
  created_by: string;
  created_at: string;
}

// Interface for room user
interface RoomUser {
  room_id: string;
  user_id: string;
  username: string;
  joined_at: string;
}

// Interface for chat message
interface ChatMessage {
  id: number;
  room_id: string;
  user_id: string;
  username: string;
  message: string;
  created_at: string;
}

export default function CodeCollaboration() {
  const { user } = useUser();
  const [code, setCode] = useState(`// Write your code here...
function example() {
  // Your code will appear here
  return "Ready to code";
}
`);
  
  const [language, setLanguage] = useState("javascript");
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<{user: string; message: string; timestamp: Date}[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [outputResult, setOutputResult] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [username, setUsername] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [realtimeSubscribed, setRealtimeSubscribed] = useState(false);
  const [lastCodeUpdate, setLastCodeUpdate] = useState<Date | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Set initial username from Clerk
  useEffect(() => {
    if (user) {
      const displayName = user.firstName 
        ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
        : user.username || user.emailAddresses[0]?.emailAddress.split('@')[0] || 'User';
      setUsername(displayName);
    } else {
      const randomNames = ["User", "Dev", "Coder", "Programmer", "Builder", "Creator"];
      const randomNum = Math.floor(Math.random() * 1000);
      setUsername(`${randomNames[Math.floor(Math.random() * randomNames.length)]}${randomNum}`);
    }
  }, [user]);
  
  // Load session from localStorage on component mount
  useEffect(() => {
    const savedSession = localStorage.getItem('collabSession');
    if (savedSession) {
      try {
        const sessionData: SessionData = JSON.parse(savedSession);
        setRoomId(sessionData.roomId);
        setIsCollaborating(sessionData.isCollaborating);
        setActiveUsers(sessionData.activeUsers);
        
        // Parse timestamps back to Date objects
        setChatMessages(sessionData.chatMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
        
        setCode(sessionData.code);
        setLanguage(sessionData.language);
        setOutputResult(sessionData.outputResult);
        
        if (sessionData.username) {
          setUsername(sessionData.username);
        }
        
        console.log("Restored collaboration session");
        
        // Rejoin room if was collaborating
        if (sessionData.isCollaborating && sessionData.roomId) {
          fetchRoomData(sessionData.roomId);
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
      }
    }
  }, []);
  
  // Save session to localStorage whenever important state changes
  useEffect(() => {
    if (isCollaborating && roomId) {
      const sessionData: SessionData = {
        roomId,
        isCollaborating,
        username,
        activeUsers,
        chatMessages: chatMessages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        })),
        code,
        language,
        outputResult
      };
      
      localStorage.setItem('collabSession', JSON.stringify(sessionData));
      console.log("Saved collaboration session");
    }
  }, [roomId, isCollaborating, activeUsers, chatMessages, code, language, outputResult, username]);
  
  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Subscribe to Supabase real-time updates for a room
  useEffect(() => {
    if (isCollaborating && roomId && !realtimeSubscribed) {
      // Subscribe to code changes
      const codeSubscription = supabase
        .channel(`room:${roomId}:code`)
        .on('postgres_changes', { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'collab_rooms',
          filter: `id=eq.${roomId}`
        }, (payload) => {
          // Only update if someone else changed the code
          if (payload.new && payload.new.updated_by !== user?.id) {
            setCode(payload.new.code);
            setLanguage(payload.new.language);
            setLastCodeUpdate(new Date(payload.new.updated_at));
          }
        })
        .subscribe();

      // Subscribe to chat messages
      const chatSubscription = supabase
        .channel(`room:${roomId}:chat`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'collab_messages',
          filter: `room_id=eq.${roomId}`
        }, (payload) => {
          if (payload.new && payload.new.user_id !== user?.id) {
            setChatMessages(prev => [...prev, {
              user: payload.new.username,
              message: payload.new.message,
              timestamp: new Date(payload.new.created_at)
            }]);
          }
        })
        .subscribe();

      // Subscribe to room users
      const usersSubscription = supabase
        .channel(`room:${roomId}:users`)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'collab_room_users',
          filter: `room_id=eq.${roomId}`
        }, (payload) => {
          fetchRoomUsers();
        })
        .subscribe();

      setRealtimeSubscribed(true);

      // Cleanup subscriptions
      return () => {
        codeSubscription.unsubscribe();
        chatSubscription.unsubscribe();
        usersSubscription.unsubscribe();
        setRealtimeSubscribed(false);
      };
    }
  }, [isCollaborating, roomId, user?.id]);

  // Fetch room data from Supabase
  const fetchRoomData = async (roomId: string) => {
    try {
      // Get room details
      const { data: roomData, error: roomError } = await supabase
        .from('collab_rooms')
        .select('*')
        .eq('id', roomId)
        .single();
        
      if (roomError) throw roomError;
      
      if (roomData) {
        setCode(roomData.code);
        setLanguage(roomData.language);
        setIsCollaborating(true);
        
        // Join the room
        const { error: joinError } = await supabase
          .from('collab_room_users')
          .upsert({
            room_id: roomId,
            user_id: user?.id || 'anonymous',
            username: username,
            joined_at: new Date().toISOString()
          });
          
        if (joinError) throw joinError;
        
        // Fetch room users
        fetchRoomUsers();
        
        // Fetch chat messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('collab_messages')
          .select('*')
          .eq('room_id', roomId)
          .order('created_at', { ascending: true });
          
        if (messagesError) throw messagesError;
        
        if (messagesData) {
          setChatMessages(messagesData.map(msg => ({
            user: msg.username,
            message: msg.message,
            timestamp: new Date(msg.created_at)
          })));
        }
        
        // Add system message
        const systemMessage = {
          user: "System",
          message: `You joined room ${roomId}`,
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, systemMessage]);
      } else {
        throw new Error("Room not found");
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
      alert("Error joining room. The room may not exist.");
      setIsJoining(false);
      setIsCollaborating(false);
    }
  };
  
  // Fetch active users in the room
  const fetchRoomUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('collab_room_users')
        .select('username')
        .eq('room_id', roomId);
        
      if (error) throw error;
      
      if (data) {
        setActiveUsers(data.map(user => user.username));
      }
    } catch (error) {
      console.error("Error fetching room users:", error);
    }
  };
  
  // Create a new collaboration room
  const handleCreateRoom = async () => {
    setIsCreating(true);
    
    try {
      // Create a new room ID
      const newRoomId = `room-${Math.floor(Math.random() * 1000000)}`;
      
      // Create room in database
      const { error: roomError } = await supabase
        .from('collab_rooms')
        .insert({
          id: newRoomId,
          code: code,
          language: language,
          created_by: user?.id || 'anonymous',
          created_at: new Date().toISOString(),
          updated_by: user?.id || 'anonymous',
          updated_at: new Date().toISOString()
        });
        
      if (roomError) throw roomError;
      
      // Add user to room
      const { error: userError } = await supabase
        .from('collab_room_users')
        .insert({
          room_id: newRoomId,
          user_id: user?.id || 'anonymous',
          username: username,
          joined_at: new Date().toISOString()
        });
        
      if (userError) throw userError;
      
      // Set room data in state
      setRoomId(newRoomId);
      setIsCollaborating(true);
      setActiveUsers([username]);
      
      // Add system message
      const systemMessage = {
        user: "System",
        message: "Room created successfully. Share the room ID with others to collaborate.",
        timestamp: new Date()
      };
      
      setChatMessages([systemMessage]);
      
      // Insert system message in database
      await supabase
        .from('collab_messages')
        .insert({
          room_id: newRoomId,
          user_id: 'system',
          username: 'System',
          message: "Room created successfully. Share the room ID with others to collaborate.",
          created_at: new Date().toISOString()
        });
      
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Error creating room. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };
  
  // Join an existing collaboration room
  const handleJoinRoom = async () => {
    if (!roomId.trim()) {
      alert("Please enter a room ID");
      return;
    }
    
    setIsJoining(true);
    try {
      await fetchRoomData(roomId);
    } finally {
      setIsJoining(false);
    }
  };
  
  // Update code in the collaboration room
  const handleCodeChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    // Update typing indicator
    if (!isTyping) {
      setIsTyping(true);
      
      // Send typing indicator to chat
      const now = new Date();
      // Only add a typing message if we haven't updated in the last 5 seconds
      if (!lastCodeUpdate || (now.getTime() - lastCodeUpdate.getTime() > 5000)) {
        await supabase
          .from('collab_messages')
          .insert({
            room_id: roomId,
            user_id: user?.id || 'anonymous',
            username: username,
            message: "is typing...",
            created_at: now.toISOString()
          });
      }
      
      // Reset typing indicator after delay
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
    
    // Debounce code updates to Supabase
    const timeoutId = setTimeout(async () => {
      if (isCollaborating && roomId) {
        try {
          const now = new Date();
          setLastCodeUpdate(now);
          
          const { error } = await supabase
            .from('collab_rooms')
            .update({
              code: newCode,
              language: language,
              updated_by: user?.id || 'anonymous',
              updated_at: now.toISOString()
            })
            .eq('id', roomId);
            
          if (error) throw error;
        } catch (error) {
          console.error("Error updating code:", error);
        }
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  };
  
  // Update language in the collaboration room
  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    
    // Add a system message about the language change
    const systemMessage = {
      user: "System",
      message: `Language changed to ${newLanguage}`,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, systemMessage]);
    
    // Update language in database
    if (isCollaborating && roomId) {
      try {
        const { error } = await supabase
          .from('collab_rooms')
          .update({
            language: newLanguage,
            updated_by: user?.id || 'anonymous',
            updated_at: new Date().toISOString()
          })
          .eq('id', roomId);
          
        if (error) throw error;
        
        // Add system message to database
        await supabase
          .from('collab_messages')
          .insert({
            room_id: roomId,
            user_id: 'system',
            username: 'System',
            message: `Language changed to ${newLanguage}`,
            created_at: new Date().toISOString()
          });
      } catch (error) {
        console.error("Error updating language:", error);
      }
    }
  };
  
  // Leave the collaboration room
  const handleLeaveRoom = async () => {
    // Add confirmation dialog
    if (confirm("Are you sure you want to leave this room? Your session data will be cleared.")) {
      if (isCollaborating && roomId) {
        try {
          // Remove user from room
          const { error } = await supabase
            .from('collab_room_users')
            .delete()
            .eq('room_id', roomId)
            .eq('user_id', user?.id || 'anonymous');
            
          if (error) throw error;
          
          // Add system message to database
          await supabase
            .from('collab_messages')
            .insert({
              room_id: roomId,
              user_id: 'system',
              username: 'System',
              message: `${username} left the room`,
              created_at: new Date().toISOString()
            });
        } catch (error) {
          console.error("Error leaving room:", error);
        }
      }
      
      setIsCollaborating(false);
      setRoomId("");
      setActiveUsers([]);
      setChatMessages([]);
      setOutputResult("");
      setRealtimeSubscribed(false);
      
      // Clear session data from localStorage
      localStorage.removeItem('collabSession');
    }
  };

  // Send a chat message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const message = {
      user: username,
      message: newMessage,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, message]);
    setNewMessage("");
    
    // Save message to database
    if (isCollaborating && roomId) {
      try {
        const { error } = await supabase
          .from('collab_messages')
          .insert({
            room_id: roomId,
            user_id: user?.id || 'anonymous',
            username: username,
            message: newMessage,
            created_at: new Date().toISOString()
          });
          
        if (error) throw error;
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle Enter key in chat input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Run code function
  const handleRunCode = () => {
    setIsRunning(true);
    
    setTimeout(() => {
      try {
        let result = "";
        
        // For demo purposes, we'll just execute JavaScript code safely with Function
        if (language === "javascript") {
          try {
            // Use a sandboxed approach to run code
            // This is just a simplified example - a real implementation would use a more secure approach
            const consoleOutput: string[] = [];
            const sandbox = {
              console: {
                log: (...args: any[]) => {
                  consoleOutput.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' '));
                }
              }
            };
            
            // Very basic sandboxing - not secure for production
            const sandboxedCode = `
              "use strict";
              ${code}
            `;
            
            // Execute in sandbox
            new Function('console', sandboxedCode)(sandbox.console);
            
            result = consoleOutput.map(line => `> ${line}`).join('\n');
          } catch (jsError) {
            throw new Error(`JavaScript error: ${jsError}`);
          }
        } else {
          // For other languages, just show a placeholder
          result = `[This is a demo. In a real implementation, ${language} code would be executed on the server]`;
        }
        
        setOutputResult(result || "No output");
        
        // Add a system message about the code execution
        const systemMessage = {
          user: "System",
          message: "Code executed",
          timestamp: new Date()
        };
        
        setChatMessages(prev => [...prev, systemMessage]);
        
        // Add system message to database
        if (isCollaborating && roomId) {
          supabase
            .from('collab_messages')
            .insert({
              room_id: roomId,
              user_id: 'system',
              username: 'System',
              message: "Code executed",
              created_at: new Date().toISOString()
            })
            .then(({ error }) => {
              if (error) console.error("Error saving execution message:", error);
            });
        }
      } catch (error) {
        if (error instanceof Error) {
          setOutputResult(`Error: ${error.message}`);
          
          // Add system message about the error
          const errorMessage = {
            user: "System",
            message: `Error running code: ${error.message}`,
            timestamp: new Date()
          };
          
          setChatMessages(prev => [...prev, errorMessage]);
          
          // Add error message to database
          if (isCollaborating && roomId) {
            supabase
              .from('collab_messages')
              .insert({
                room_id: roomId,
                user_id: 'system',
                username: 'System',
                message: `Error running code: ${error.message}`,
                created_at: new Date().toISOString()
              })
              .then(({ error: dbError }) => {
                if (dbError) console.error("Error saving error message:", dbError);
              });
          }
        } else {
          setOutputResult("An unknown error occurred");
        }
      }
      
      setIsRunning(false);
    }, 500);
  };

  // Format code function
  const handleFormatCode = async () => {
    // Simple formatting - add indentation and spacing
    const formattedCode = code
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .replace(/\{/g, ' {\n  ')
      .replace(/\}/g, '\n}\n')
      .replace(/;/g, ';\n')
      .replace(/\n\s*\n/g, '\n\n');
    
    setCode(formattedCode);
    
    // Update code in database
    if (isCollaborating && roomId) {
      try {
        const { error } = await supabase
          .from('collab_rooms')
          .update({
            code: formattedCode,
            updated_by: user?.id || 'anonymous',
            updated_at: new Date().toISOString()
          })
          .eq('id', roomId);
          
        if (error) throw error;
      } catch (error) {
        console.error("Error updating formatted code:", error);
      }
    }
    
    // Add a system message about formatting
    const systemMessage = {
      user: "System",
      message: "Code has been formatted",
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, systemMessage]);
    
    // Add system message to database
    if (isCollaborating && roomId) {
      try {
        await supabase
          .from('collab_messages')
          .insert({
            room_id: roomId,
            user_id: 'system',
            username: 'System',
            message: "Code has been formatted",
            created_at: new Date().toISOString()
          });
      } catch (error) {
        console.error("Error saving format message:", error);
      }
    }
  };

  // Share code function
  const handleShareCode = () => {
    // Copy room ID to clipboard
    navigator.clipboard.writeText(roomId).then(() => {
      alert(`Room ID "${roomId}" copied to clipboard. Share this with collaborators.`);
      
      const systemMessage = {
        user: "System",
        message: "Room ID copied to clipboard for sharing",
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, systemMessage]);
      
      // Add system message to database
      if (isCollaborating && roomId) {
        supabase
          .from('collab_messages')
          .insert({
            room_id: roomId,
            user_id: 'system',
            username: 'System',
            message: "Room ID copied to clipboard for sharing",
            created_at: new Date().toISOString()
          })
          .then(({ error }) => {
            if (error) console.error("Error saving share message:", error);
          });
      }
    });
  };

  // Update username
  const handleUpdateUsername = async () => {
    const newUsername = prompt("Enter your display name:", username);
    if (newUsername && newUsername.trim()) {
      const oldUsername = username;
      const updatedUsername = newUsername.trim();
      
      // Update username in active users
      setActiveUsers(prev => 
        prev.map(user => user === oldUsername ? updatedUsername : user)
      );
      
      // Add system message
      const systemMessage = {
        user: "System",
        message: `${oldUsername} changed their name to ${updatedUsername}`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, systemMessage]);
      
      // Update username in state
      setUsername(updatedUsername);
      
      // Update username in database
      if (isCollaborating && roomId) {
        try {
          // Update user in room
          const { error: userError } = await supabase
            .from('collab_room_users')
            .update({
              username: updatedUsername
            })
            .eq('room_id', roomId)
            .eq('user_id', user?.id || 'anonymous');
            
          if (userError) throw userError;
          
          // Add system message to database
          await supabase
            .from('collab_messages')
            .insert({
              room_id: roomId,
              user_id: 'system',
              username: 'System',
              message: `${oldUsername} changed their name to ${updatedUsername}`,
              created_at: new Date().toISOString()
            });
        } catch (error) {
          console.error("Error updating username:", error);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {!isCollaborating ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCreateRoom}
              disabled={isCreating}
              className="btn-primary px-6 py-3 flex-1"
            >
              {isCreating ? "Creating Room..." : "Create New Room"}
            </button>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white"
              />
              <button
                onClick={handleJoinRoom}
                disabled={isJoining}
                className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2"
              >
                {isJoining ? "Joining..." : "Join"}
              </button>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h3 className="t-heading-sm mb-4">Real-time Collaboration IDE</h3>
            <p className="opacity-80 mb-4">
              Browser-based IDE with real-time collaboration, code sharing, and integrated chat for pair programming.
            </p>
            <div className="bg-blue-500/20 p-4 rounded-lg mb-4">
              <p className="text-blue-300 text-sm">
                <strong>Real-time collaboration:</strong> This feature uses Supabase's real-time capabilities to enable live code editing and chat between multiple users.
              </p>
            </div>
            <div className="bg-cyan-500/20 p-4 rounded-lg mb-4">
              <p className="text-cyan-300 text-sm font-medium mb-2">Quick Start:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Create a new room or join an existing one with a Room ID</li>
                <li>Share the Room ID with others to collaborate</li>
                <li>Write and edit code together in real-time</li>
                <li>Use the chat to discuss your code</li>
              </ol>
            </div>
            <ul className="list-disc list-inside space-y-2 opacity-80">
              <li>Write and edit code together in real-time</li>
              <li>Run JavaScript code directly in the browser</li>
              <li>Format code for readability</li>
              <li>Real-time chat with collaborators</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="t-heading-sm">Room: {roomId}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs mr-2">Active Users ({activeUsers.length}):</span>
                <div className="flex -space-x-2">
                  {activeUsers.map((user, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full ${
                        user === username 
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500" 
                          : "bg-gradient-to-r from-purple-500 to-pink-500"
                      } flex items-center justify-center text-xs border border-black`}
                      title={user}
                    >
                      {user[0]}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={handleUpdateUsername}
                  className="ml-3 text-xs bg-white/10 hover:bg-white/20 rounded px-2 py-1"
                  title="Change your display name"
                >
                  @{username}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
              <button
                onClick={handleLeaveRoom}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg px-4 py-2 text-sm"
              >
                Leave Room
              </button>
            </div>
          </div>
          
          {isTyping && (
            <div className="bg-white/5 p-2 rounded-lg text-xs text-cyan-300">
              Someone is typing...
            </div>
          )}
          
          <div className="bg-black/30 rounded-lg border border-white/10 overflow-hidden">
            <div className="bg-white/5 p-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm">Collaborative Editor</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleFormatCode}
                  className="text-xs bg-white/10 hover:bg-white/20 rounded px-2 py-1"
                >
                  Format
                </button>
                <button 
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="text-xs bg-white/10 hover:bg-white/20 rounded px-2 py-1"
                >
                  {isRunning ? "Running..." : "Run"}
                </button>
                <button 
                  onClick={handleShareCode}
                  className="text-xs bg-white/10 hover:bg-white/20 rounded px-2 py-1"
                >
                  Share
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-80 bg-black/50 text-green-400 font-mono p-4 focus:outline-none"
              spellCheck="false"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-medium mb-2">Chat</h4>
              <div 
                ref={chatContainerRef}
                className="h-40 bg-black/20 rounded mb-2 p-2 overflow-y-auto"
              >
                {chatMessages.map((msg, index) => (
                  <div key={index} className="text-xs mb-2">
                    <span 
                      className={`font-medium ${
                        msg.user === "System" 
                          ? "text-gray-400" 
                          : msg.user === username 
                            ? "text-cyan-400"
                            : "text-purple-400"
                      }`}
                    >
                      {msg.user}:
                    </span>{" "}
                    {msg.message}
                    <span className="text-gray-500 text-[10px] ml-1">
                      {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded p-2 text-sm"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded px-3"
                >
                  Send
                </button>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-medium mb-2">Output</h4>
              <div className="h-[9.5rem] bg-black/20 rounded p-2 font-mono text-xs text-green-400 overflow-auto whitespace-pre-line">
                {outputResult || (language === "javascript" ? "> Run your code to see output here" : `[${language} code execution requires server-side implementation]`)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 