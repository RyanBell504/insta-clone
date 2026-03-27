import data from '../data.json' with { type: 'json' };


export default function handler(request, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(data);
}