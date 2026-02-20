ALTER TABLE staffbase.salary
ADD COLUMN "userId" INT;

ALTER TABLE staffbase.salary
ADD CONSTRAINT fk_salary_user
FOREIGN KEY ("userId")
REFERENCES staffbase."user"(user_id)
ON DELETE CASCADE;