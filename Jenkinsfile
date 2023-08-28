pipeline {
    agent 
    {
        docker {
            image 'node:18.17-buster-slim'
        }
    }

    stages {
        stage('git checkout'){
            steps{
                echo 'git checkout '
                sh 'git clone https://github.com/lawbbNi/P3-task-room.git'
            }
        }
        stage('envirnment') {
            steps {
                echo 'set up enviornment and libraries'
                dir("./client"){
                    //sh 'sudo chown -R 115:122 "/.npm"'
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
                withAWS(credentials: 'aws_jr_law', region: 'ap-southeast-2'){  
                    dir("./client"){
                        sh 'aws s3 cp build s3://taskroom.click'
                        sh 'aws s3 cp index.html s3://taskroom.click'
                    }
                }
                
            }
        }
        
        
    }
    post{
            always{
                cleanWs()
            }
        }
}
