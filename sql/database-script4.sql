ALTER TABLE staffbase.tasks
ADD COLUMN "userId" INT NOT NULL;


ALTER TABLE staffbase.tasks
ADD CONSTRAINT fk_task_user
FOREIGN KEY ("userId")
REFERENCES staffbase."user"(user_id)
ON DELETE CASCADE;