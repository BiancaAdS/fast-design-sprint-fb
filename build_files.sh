# build_files.sh
pip install --upgrade pip
pip install psycopg2
pip install -r requirements.txt
python3.9 manage.py collectstatic