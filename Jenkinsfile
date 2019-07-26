pipeline {
    agent none

    stages {
        stage('Build') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    echo $PATH
                    echo $ADMIN_WWW_PATH
                    node -v
                    npm -v
                    npm install
                    npm run build
                '''
            }
        }
        stage('Deploy Dev') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    current=`date "+%s"`
                    lib_name=${current}.tar.gz
                    cd dist
                    tar -zcvf ${lib_name} *

                    if [ ! -d ${ADMIN_WWW_PATH}  ];then
                        mkdir ${ADMIN_WWW_PATH}
                    fi
                    mv ${lib_name} ${ADMIN_WWW_PATH}
                    tar -zxvf ${ADMIN_WWW_PATH}/${lib_name} -C ${ADMIN_WWW_PATH}
                    rm -rf ${ADMIN_WWW_PATH}/${lib_name}
                '''
            }
        }

        stage('Approve of Deploy Prod') {
          steps {
            input message: 'deploy to Prod?'
          }
        }

        stage('Deploy Prod') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    echo deploy prod
                '''
            }
        }
    }
}