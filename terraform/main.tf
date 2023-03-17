provider "aws" {
  region = "eu-west-1"
}

locals {
  app_name = "nestjs-app"
}

resource "aws_ecr_repository" "this" {
  name = local.app_name
}

module "elastic_beanstalk_environment" {
  source  = "cloudposse/elastic-beanstalk-environment/aws"
  version = "0.34.0"

  name = local.app_name
  application = local.app_name

  solution_stack_name = "64bit Amazon Linux 2 v3.4.8 running Docker"

  instance_type = "t2.micro"

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = "vpc-0ed56eafa9fc8c75e"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DOCKER_REGISTRY"
    value     = aws_ecr_repository.this.repository_url
  }

  # Add more settings as needed, such as for RDS, environment variables, etc.
}
