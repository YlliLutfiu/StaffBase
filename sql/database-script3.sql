ALTER TABLE staffbase.employee
ADD COLUMN "userId" INT;

ALTER TABLE staffbase.employee
ADD CONSTRAINT fk_employee_user
FOREIGN KEY ("userId")
REFERENCES staffbase."user"(user_id)
ON DELETE CASCADE;