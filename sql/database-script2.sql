ALTER TABLE staffbase.departments
ADD COLUMN userId INT NOT NULL;

ALTER TABLE staffbase.departments
ADD CONSTRAINT fk_departments_user
FOREIGN KEY (userId)
REFERENCES staffbase.users(userId)
ON DELETE CASCADE;