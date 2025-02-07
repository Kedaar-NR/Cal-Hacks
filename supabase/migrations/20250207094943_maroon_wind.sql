/*
  # User Profile System Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, matches auth.users.id)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `preferred_mode` (text)
      - `preferred_duration` (integer)
      - `theme` (text)
      - `sound_enabled` (boolean)
      - `visual_feedback_enabled` (boolean)
    
    - `typing_tests`
      - `id` (uuid)
      - `user_id` (uuid, references profiles)
      - `mode` (text)
      - `duration` (integer)
      - `wpm` (integer)
      - `accuracy` (numeric)
      - `errors` (integer)
      - `text_content` (text)
      - `created_at` (timestamp)
    
    - `achievements`
      - `id` (uuid)
      - `user_id` (uuid, references profiles)
      - `type` (text)
      - `name` (text)
      - `description` (text)
      - `achieved_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  preferred_mode text DEFAULT 'time',
  preferred_duration integer DEFAULT 60,
  theme text DEFAULT 'system',
  sound_enabled boolean DEFAULT true,
  visual_feedback_enabled boolean DEFAULT true
);

-- Create typing_tests table
CREATE TABLE IF NOT EXISTS typing_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  mode text NOT NULL,
  duration integer,
  wpm integer NOT NULL,
  accuracy numeric(5,2) NOT NULL,
  errors integer NOT NULL,
  text_content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  type text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  achieved_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE typing_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Typing tests policies
CREATE POLICY "Users can view their own tests"
  ON typing_tests FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own tests"
  ON typing_tests FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own tests"
  ON typing_tests FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Achievements policies
CREATE POLICY "Users can view their own achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());