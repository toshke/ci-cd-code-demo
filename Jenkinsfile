pipeline {

  agent any;


  stages {

    stage('Prepare'){
        steps {
          sh """#!/bin/bash
  which ecs-cli
  if [ \$? -ne 0 ]; then
  	sudo curl -o /usr/local/bin/ecs-cli https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-linux-amd64-latest
    sudo chmod a+x /usr/local/bin/ecs-cli
  fi
  """
        }
    }

    stage('Build'){
        steps {
          println "Building application image"
          script {
            def accountId = sh script: 'aws sts get-caller-identity --query Account --output text', returnStdout: true
            accountId = accountId.replace("\n","")
            sh "docker build -t cicdasacodedemo:latest ."
            sh "docker tag cicdasacodedemo:latest ${accountId}.dkr.ecr.us-east-1.amazonaws.com/cicdasacodedemo:latest"
          }
        }
    }

    stage('Push to ECR'){
        steps {
          script {
            def accountId = sh script: 'aws sts get-caller-identity --query Account --output text', returnStdout: true
            accountId = accountId.replace("\n","")
            println "Pushing to ECR repository..."
            sh "aws ecr get-login --region us-east-1 | bash"
            sh "docker push ${accountId}.dkr.ecr.us-east-1.amazonaws.com/cicdasacodedemo:latest"
            sh "docker rmi ${accountId}.dkr.ecr.us-east-1.amazonaws.com/cicdasacodedemo:latest"
            sh "docker rmi cicdasacodedemo:latest"
          }

        }
    }

  }
}