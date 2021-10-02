import datetime

project_time = datetime.timedelta(minutes=30)
start = datetime.datetime(2021, 9, 28, 3, 0)
end = datetime.datetime(2021, 10, 28, 3, 0)
events = [
    {
        'id': 1,
        'user_id': 1,
        'project_id': None,
        'title': 'cccc',
        'start': datetime.datetime(2021, 9, 28, 3, 30),
        'end': datetime.datetime(2021, 9, 28, 5, 0),
    },
    {
        'id': 2,
        'user_id': 1,
        'project_id': None,
        'title': 'cccc',
        'start': datetime.datetime(2021, 9, 29, 4, 30),
        'end': datetime.datetime(2021, 9, 29, 6, 30),
    }
]
result = []
for date in range((end - start).days):
    start = start + project_time
    print(start)
    for event in events:
        if start == event['start']:
            result.append({'date': start, 'status': 'busy'})
        else:
            result.append({'date': start, 'status': 'available'})

print(result)
