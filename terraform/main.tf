provider "aws" {
  region = "us-west-2"
}

resource "aws_ecr_repository" "nestjs_app" {
  name = "nestjs-app"
}

module "fargate" {
  source  = "terraform-aws-modules/ecs/aws/modules/fargate-service"
  version = "~> 3.0"

  name = "nestjs-app"

  ecs_cluster_name = "nestjs-app-cluster"
  task_definition = data.template_file.task_definition.rendered

  container_definitions = jsonencode([{
    name  = "nestjs-app"
    image = "${aws_ecr_repository.nestjs_app.repository_url}:latest"
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
    }]
  }])

  # Configure the load balancer
  lb_arn        = aws_lb.this.arn
  lb_dns_name   = aws_lb.this.dns_name
  lb_zone_id    = aws_lb.this.zone_id
  lb_https      = false
}

resource "aws_lb" "this" {
  name               = "nestjs-app-lb"
  internal           = false
  load_balancer_type = "application"
  subnets            = ["subnet-12345", "subnet-67890"] # Replace with your subnets
}

resource "aws_security_group" "this" {
  name = "nestjs-app"
}

output "ecs_task_definition_arn" {
  description = "ARN of the task definition"
  value       = module.fargate.task_definition_arn
}

data "template_file" "task_definition" {
  template = file("${path.module}/task-definition.tpl")
}