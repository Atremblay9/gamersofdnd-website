import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey); 


// Handle POST request for login
export async function POST(req) {
  const { email, password } = await req.json(); // Get the request body

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email , password: password });

    if (error) throw new Error(error.message);

    // Respond with user data and token
    return new Response(
      JSON.stringify({ 
        user: data.user,
        token: data.session.access_token 
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 401 }
    );
  }
}
