/**
 * need to reassign post content in current database from previous database
 * TODO : close DB connections
 */

const R = require('ramda');
const config = require('./config');

const mysqlP = require('mysql2/promise');

const createConnection = (database) =>
  mysqlP.createConnection({
    host: 'localhost', user: 'root', database, password: 'root' });

const parseResults = (results) => {
  const json = JSON.stringify(results[0]);
  const data = JSON.parse(json);
  return data;
};

// get post IDs of all possibly affacted posts
const getAffectedPostIds = (connection) =>
  connection.execute(
    'SELECT `ID` FROM `wp_posts` WHERE `post_status` = ?  && `post_type` = ?', ['publish', 'post']);

// update affected posts with content from old DB
const updatePost = R.curry((oldDB, newDB, ID) => {
  // old content
  const getContent = () => oldDB.execute(
    'SELECT `post_content` FROM `wp_posts` WHERE `ID` = ?', [ID]);
  // updating newDB with Old Content
  const updateContent = (content) =>
    newDB.execute('UPDATE `wp_posts` SET `post_content`= ? WHERE `ID` = ?', [content, ID]);

  const debug = R.curry((id, info) => console.log('ID', id, info, '*************'));

  return R.composeP(
    debug(ID),
    parseResults, updateContent, R.prop('post_content'), R.head, parseResults, getContent)();
});

const run = (postIDs) => {
  Promise.all([createConnection(config.oldDB), createConnection(config.newDB)])
  .then(([oldDB, newDB]) => {
    postIDs.forEach((post, index) => {
      if (index < 3) updatePost(oldDB, newDB, post.ID);
    });
  });
};

R.composeP(run, parseResults, getAffectedPostIds, createConnection)(config.oldDB);
