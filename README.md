# BotaBook
## Getting started
### Requirements

```
sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl python3.8-venv
sudo -u postgres psql
CREATE DATABASE botabook;
CREATE USER bota_user WITH PASSWORD '<password>';
ALTER ROLE bota_user SET client_encoding TO 'utf8';
ALTER ROLE bota_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE bota_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE botabook TO bota_user;
\q
sudo -H pip3 install --upgrade pip
sudo -H pip3 install virtualenv
ssh-keygen #generate user keys and add to github
git clone git@github.com:abogaevski/botabook.git
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
mkdir logs
touch .env # .env.sample for example

```
    redis - for celery queue
    celery -A src beat
    celery -A src worker --loglevel=debug --concurrency=4


