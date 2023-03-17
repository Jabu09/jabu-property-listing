{
  "family": "${name}",
  "networkMode": "awsvpc",
  "containerDefinitions": ${container_definitions},
  "requiresCompatibilities": [
    "FARGATE"
  ],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "${execution_role_arn}",
  "taskRoleArn": "${task_role_arn}"
}