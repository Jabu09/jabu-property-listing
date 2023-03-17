provider "aws" {
  region = "us-west-2"
}

locals {
  app_name = "nestjs-docker-app"
}

resource "aws_ecs_cluster" "this" {
  name = local.app_name
}

resource "aws_ecs_task_definition" "this" {
  family                = local.app_name
  requires_compatibilities = ["FARGATE"]
  network_mode          = "awsvpc"
  cpu                   = "256"
  memory                = "512"
  execution_role_arn    = aws_iam_role.execution.arn
  task_role_arn         = aws_iam_role.task.arn

  container_definitions = jsonencode([
    {
      name = local.app_name
      image = "jaybee095/jabu-property-listing:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]
    }
  ])
}

resource "aws_iam_role" "execution" {
  name = "ecs-task-execution-role-new-two"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role" "task" {
  name = "ecs-task-role-new-two"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "this" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  role       = aws_iam_role.execution.name
}

resource "aws_security_group" "this" {
  name = "nestjs-docker-app-new-three"
  description = "Security group for NestJS Docker app"
  vpc_id      = "vpc-0ed56eafa9fc8c75e"
}

resource "aws_security_group_rule" "allow_inbound" {
  security_group_id = aws_security_group.this.id

  type        = "ingress"
  from_port   = 3000
  to_port     = 3000
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_vpc" "this" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = local.app_name
  }
}

resource "aws_subnet" "this" {
  cidr_block = "10.0.1.0/24"
  vpc_id     = "vpc-0ed56eafa9fc8c75e"

  tags = {
    Name = local.app_name
  }
}

resource "aws_ecs_service" "this" {
  name            = local.app_name
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.this.arn
  launch_type     = "FARGATE"

  desired_count = 1

  network_configuration {
    subnets = [aws_subnet.this.id]

    assign_public_ip = true
    security_groups  = [aws_security_group.this.id]
  }
}