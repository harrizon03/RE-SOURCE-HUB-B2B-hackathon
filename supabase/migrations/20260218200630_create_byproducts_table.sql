/*
  # Create byproducts table for RE-SOURCE HUB

  1. New Tables
    - `byproducts`
      - `id` (bigint, primary key, auto-increment)
      - `material` (text) - Type of material/asset being tracked
      - `routing` (text) - Routing information for the material
      - `distance` (text) - Haulage distance
      - `rawVolume` (numeric) - Volume in tonnes
      - `created_at` (timestamptz) - Timestamp of record creation

  2. Security
    - Enable RLS on `byproducts` table
    - Add policy for public read access (for dashboard viewing)
    - Add policy for public insert access (for material injection)

  3. Notes
    - This table stores industrial byproduct materials and their routing information
    - Public access is enabled for demo purposes
    - Distance is stored as text to preserve formatted values like "3.5 km"
*/

CREATE TABLE IF NOT EXISTS byproducts (
  id bigserial PRIMARY KEY,
  material text NOT NULL,
  routing text NOT NULL,
  distance text NOT NULL,
  "rawVolume" numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE byproducts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
  ON byproducts
  FOR SELECT
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON byproducts
  FOR INSERT
  WITH CHECK (true);