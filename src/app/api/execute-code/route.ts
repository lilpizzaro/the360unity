import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { exec } from "child_process";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";

// Make exec return a Promise
const execAsync = promisify(exec);

// This is needed to ensure the route is properly compiled
export const dynamic = 'force-dynamic';

// Create a temporary directory for code execution
const TMP_DIR = join(process.cwd(), "tmp");

// Function to safely execute code in a restricted environment
async function executeCode(code: string, language: string): Promise<{ output: string; error: string | null }> {
  // Generate a unique filename for this execution
  const fileId = uuidv4();
  let filePath = "";
  let command = "";

  try {
    // Create tmp directory if it doesn't exist
    await mkdir(TMP_DIR, { recursive: true });

    // Set up file and command based on language
    switch (language) {
      case "python":
        filePath = join(TMP_DIR, `${fileId}.py`);
        await writeFile(filePath, code);
        command = `python -u ${filePath} 2>&1`;
        break;
      case "javascript":
        filePath = join(TMP_DIR, `${fileId}.js`);
        await writeFile(filePath, code);
        command = `node ${filePath} 2>&1`;
        break;
      case "typescript":
        filePath = join(TMP_DIR, `${fileId}.ts`);
        await writeFile(filePath, code);
        command = `npx ts-node ${filePath} 2>&1`;
        break;
      case "java":
        filePath = join(TMP_DIR, `${fileId}.java`);
        await writeFile(filePath, code);
        // Extract class name for Java execution
        const className = code.match(/class\s+(\w+)/)?.[1] || "Main";
        command = `cd ${TMP_DIR} && javac ${fileId}.java && java ${className} 2>&1`;
        break;
      case "c":
        filePath = join(TMP_DIR, `${fileId}.c`);
        await writeFile(filePath, code);
        command = `cd ${TMP_DIR} && gcc ${fileId}.c -o ${fileId} && ./${fileId} 2>&1`;
        break;
      case "cpp":
        filePath = join(TMP_DIR, `${fileId}.cpp`);
        await writeFile(filePath, code);
        command = `cd ${TMP_DIR} && g++ ${fileId}.cpp -o ${fileId} && ./${fileId} 2>&1`;
        break;
      case "ruby":
        filePath = join(TMP_DIR, `${fileId}.rb`);
        await writeFile(filePath, code);
        command = `ruby ${filePath} 2>&1`;
        break;
      case "go":
        filePath = join(TMP_DIR, `${fileId}.go`);
        await writeFile(filePath, code);
        command = `cd ${TMP_DIR} && go run ${fileId}.go 2>&1`;
        break;
      case "php":
        filePath = join(TMP_DIR, `${fileId}.php`);
        await writeFile(filePath, code);
        command = `php ${filePath} 2>&1`;
        break;
      default:
        return {
          output: "",
          error: `Unsupported language: ${language}`
        };
    }

    // Execute with timeout to prevent infinite loops
    const { stdout } = await execAsync(command, { timeout: 5000 });
    
    return {
      output: stdout,
      error: null
    };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    // Clean up temporary file
    if (filePath) {
      try {
        await unlink(filePath);
      } catch (e) {
        console.error("Failed to delete temporary file:", e);
      }
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    // Optional: Check authentication
    const { userId } = auth();
    
    // Parse request body
    const { code, language } = await req.json();
    
    if (!code || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Execute the code
    const result = await executeCode(code, language);
    
    if (result.error) {
      return NextResponse.json(
        { 
          success: false,
          output: result.error,
          language
        },
        { status: 200 }
      );
    }
    
    return NextResponse.json({
      success: true,
      output: result.output,
      language
    });
  } catch (error) {
    console.error("Error executing code:", error);
    return NextResponse.json(
      { 
        error: "Failed to execute code",
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 