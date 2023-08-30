pipeline {
    agent any
    tools {nodejs "nodejs"}


    stages {
        // stage('git checkout'){
        //     steps{
        //         echo 'git checkout '
        //         sh 'git clone https://github.com/lawbbNi/P3-task-room.git'
        //     }
        // }

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
                withAWS(credentials: 'aws-jr-p3-lawrence', region: 'ap-southeast-2'){  
                    dir("./client"){
                        sh 'ls'
                        sh 'aws s3 sync build s3://taskroom.click'
                        //sh 'aws s3 cp index.html s3://taskroom.click'
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