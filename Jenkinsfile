pipeline {
    agent {
        docker {
            image 'node:20-alpine'
        }
    }

    stages {
        stage('Git checkout') {
            steps {
                echo 'git checkout'
                git branch:'master', url:'https://github.com/lawbbNi/P3-task-room.git'
            }
        }
        stage('envirnment') {
            steps {
                echo 'set up enviornment and libraries'
                dir("./client"){
                    sh 'npm install'
                }
                

            }
        }
        stage('npm build'){
            steps{
                echo 'pack up front end code'
                dir("./client"){
                    sh 'npm run build'
                }
            }
        }
        stage('deploy to S3 bucket') {
            steps {
                echo 'deploy to S3 bucket'
            }
        }
        
    }
}
