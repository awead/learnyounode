function sumInput(sum) { 
  process.argv.forEach(function(val, index, array) {
    if ( val.match(/^\d+$/) )
      sum += parseInt(val);
  });
  return sum;
}

console.log(sumInput(0));
