import { createClient } from "@supabase/supabase-js";

console.log("USING UPDATED supabaseClient.js");

const supabaseUrl = "https://enpbjngsvjbzywitdxvh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVucGJqbmdzdmpienl3aXRkeHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NDc3MDEsImV4cCI6MjA1ODAyMzcwMX0.SzJE0c9TArH_bBf5shXkSc2DN-5LZEIsceVjyEHLlAw";

export const supabase = createClient(supabaseUrl, supabaseKey);




