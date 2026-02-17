-- 1️ Create the enum type for user roles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
        CREATE TYPE user_role_enum AS ENUM ('user', 'employee');
    END IF;
END$$;

-- 2️ Add the role column to the user table
ALTER TABLE staffbase."user"
ADD COLUMN IF NOT EXISTS role user_role_enum NOT NULL DEFAULT 'user';