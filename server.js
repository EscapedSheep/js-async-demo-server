const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const delay = require('delay');
const random = require('random');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const messages = [
  '\u4E3B\u4EBA\u7ED9\u4E86\u591A\u6BD4\u4E00\u53EA\u889C\u5B50!',
  '\u591A\u6BD4\u662F\u4E2A\u81EA\u7531\u7684\u5C0F\u7CBE\u7075!',
  '\u9EBB\u74DC\u7684\u4E1C\u897F\u771F\u6709\u8DA3'
];
function getRandomMessage () {
  const index = random.int(0, messages.length - 1);
  return messages[index];
}

function getMessageFromComplexity (complexity) {
  if (complexity === 0) { return getRandomMessage(); }
  else if (complexity <= 1) { return '\u7EF4\u560E\u4E01\u52D2\u7EF4\u6B27\u8428 - \u6F02\u6D6E\u5492'; }
  else if (complexity <= 2) { return '\u963F\u62C9\u970D\u9ED8\u62C9 - \u5F00\u9501\u5492'; }
  else if (complexity <= 3) { return '\u4F0A\u514B\u65AF\u5E15\u5229\u4E9A\u739B\u65AF - \u9664\u4F60\u6B66\u5668'; }
  else if (complexity <= 4) { return '\u4F0A\u514B\u65AF\u6D3E\u66FF\u6B27 \u5E15\u5C94\u7EB3\u59C6 - \u547C\u795E\u62A4\u536B'; }
  else if (complexity <= 5) { return '\u745F\u514B\u62D3\u59C6\u745F\u666E\u62C9 - \u795E\u950B\u65E0\u5F71'; }
  else { return '\u963F\u74E6\u8FBE\u5F00\u8FBE\u5F17\u62C9 - \u8981\u4F60\u8001\u547D'; }
}

app.post('/api/message', asyncHandler(async (req, res) => {
  const { text, complexity, error } = req.body;
  const timeout = (complexity || 0) * 1000;
  await delay(timeout);
  if (error) {
    res.status(500).json({
      text: '\u54CE\u5466\u6211\u53BB, \u670D\u52A1\u5668\u6302\u4E86 O_o >>> ' + text
    });
  } else {
    res.status(200).json({
      text: getMessageFromComplexity(complexity) + ' >>> ' + text
    });
  }
}));