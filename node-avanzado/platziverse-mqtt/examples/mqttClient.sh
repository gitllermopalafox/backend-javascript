mqtt pub -t 'agent/message' -h localhost -m 'Hello platziverse'
mqtt pub -t 'agent/message' -h localhost -m '{"hello": "platziverse"}'
mqtt pub -t 'agent/message' -h localhost -m '{"agent": {"uuid": "yyy", "name": "test", "username": "platzi", "pid": 10, "hostname": "platziecuador"}, "metrics": [{"type": "memory", "value": "1001"}, {"type": "temp","value": "33"} ]}'
mqtt pub -t 'agent/message' -h localhost -m '{"agent": {"uuid": "yyx", "name": "test", "username": "platzi", "pid": 10, "hostname": "platziecuador"}, "metrics": [{"type": "memory", "value": "1001"}, {"type": "temp","value": "33"} ]}'

