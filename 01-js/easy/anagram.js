/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  // change the strings to lowercase
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  let arr = Array(256).fill(0);
  for (let i = 0; i < str1.length; i++) {
    let index1 = str1.charCodeAt(i);
    let index2 = str2.charCodeAt(i);
    arr[index1]++;
    arr[index2]--;
  }
  for (let i = 0; i < 256; i++) {
    if (arr[i] !== 0) return false;
  }
  return true;
}

module.exports = isAnagram;
