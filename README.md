# BotaBook

[comment]: <> (## Getting started)
### Prerequisites
Install prerequisites
```
sudo apt update
sudo apt upgrade
sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl python3.8-venv redis-server certbot python3-certbot-nginx

```
Create database:
```
sudo -u postgres psql
CREATE DATABASE botabook;
CREATE USER bota_user WITH PASSWORD '<password>';
ALTER ROLE bota_user SET client_encoding TO 'utf8';
ALTER ROLE bota_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE bota_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE botabook TO bota_user;
\q
```
Update python
```
sudo -H pip3 install --upgrade pip
sudo -H pip3 install virtualenv
```
Create project user and generate ssh keys for github
```
sudo adduser botabook
sudo su - botabook
ssh-keygen
exit
```
Add generated public key to github. After adding clone the repository:
```
sudo mkdir /opt/botabook
sudo chown -R botabook:botabook /opt/botabook
sudo su - botabook
cd /opt/botabook
git clone git@github.com:abogaevski/botabook.git .
```
Configure backend
```
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
mkdir logs
```
Configure environment (see .env.sample file):
```
touch .env
nano .env
```
Migrate all to database:
```
python manage.py migrate
```
Test:
```
python manage.py runserver
exit
```
### Configure services
###### Gunicorn
Copy gunicorn service files from [tools](/tools/config/etc/systemd/system) directory.
Copy gunicorn tmpfiles config from [tools](/tools/config/etc/tmpfiles.d) directory.
```
sudo mkdir /var/log/gunicorn
sudo chown -R botabook:botabook /var/log/gunicorn/
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
sudo chown -R botabook:botabook /run/gunicorn.sock
sudo service gunicorn start
```
Test unix connection:
```
curl --unix-socket /run/gunicorn.sock localhost
```
###### Celery
```
sudo nano /etc/tmpfiles.d/celery.conf
sudo mkdir /var/log/celery
sudo mkdir /var/run/celery
sudo chown -R celery:celery /var/run/celery
sudo chmod -R 755 /var/run/celery
sudo chown -R botabook:botabook /var/log/celery
sudo cp /opt/botabook/tools/etc/default/celery /etc/default/celery
sudo cp /opt/botabook/tools/etc/systemd/system/celery.conf /etc/systemd/system/celery.conf
sudo cp /opt/botabook/tools/etc/systemd/system/celerybeat.conf /etc/systemd/system/celerybeat.conf
```
######NodeJS
```
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo su - botabook
cd /opt/botabook/client/
npm install
npm run build
sudo mkdir /var/www/botabook
sudo cp -r /opt/botabook/client/dist/* /var/www/botabook
sudo chown -R www-data:www-data /var/www/botabook
```

###### Nginx
Configure nginx for api. Copy this [config](/tools/config/etc/nginx/sites-available/api-botabook.conf%20)

```
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/api-botabook.conf /etc/nginx/sites-enabled
nginx -t
sudo service nginx restart
```
Configure nginx for frontend. Copy this [config](/tools/config/etc/nginx/sites-available/botabook.conf%20)
After this:
```
sudo ln -s /etc/nginx/sites-available/botabook.conf /etc/nginx/sites-enabled/
sudo certbot --nginx -d botabook.com -d api.botabook.com
```



[comment]: <> (sudo nano /etc/systemd/system/gunicorn.socket)

[comment]: <> (```)

[comment]: <> (    redis - for celery queue)

[comment]: <> (    celery -A src beat)

[comment]: <> (    celery -A src worker --loglevel=debug --concurrency=4)


