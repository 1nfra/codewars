class Interpreter {
	constructor() {
	  this.variables = {};
	  this.functions = {};
	  this.ordered_operations = [
		{
		  '*': (x, y) => ( x * y ),
		  '/': (x, y) => ( x / y ),
		  '%': (x, y) => ( x % y ),
		},
		{
		  '+': (x, y) => ( x + y ),
		  '-': (x, y) => ( x - y )
		},
		{
		  '=': (x, y) => { this.variables[x] = y; return y; }
		}
	  ];
	}
	tokenize(program) {
	  if (program === "") return [];
  
	  var regex = /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
	  return program.split(regex).filter(function (s) { return !s.match(/^\s*$/);});
	}
  
	numberize(str = '') {
		return isNaN(+str) ? this.getVariable(str) : +str;
	}  
  
	getVariable(v) {
	  return this.variables[v] === undefined ? (()=>{ throw new Error(v + ' is undefined'); })() : this.variables[v];
	}
  
	getOpMethod(op) {
	  let method;
	  this.ordered_operations.forEach(g => { if(g[op]) method = g[op] });
	  return method;
	}
  
	getOrderedOps(tokens) {
	  let ops = [];
	  this.ordered_operations.forEach((group)=>{
		 ops = ops.concat(tokens.filter((token)=>(Object.keys(group).indexOf(token) !== -1)));
	  });
	  return ops;
	}
	
	processTokens(tokens) {
	  this.removeParens(tokens);
	  let op = tokens[1]
	  let method = this.getOpMethod(op)
	  let t1 = op === '=' ? tokens[0] : this.numberize(tokens[0])

	  return  method ? method(t1, this.numberize(tokens[2])) : t1;
	}
  
	removeParens(tokens) {
	  let prev = null
	  let next = null;
	  tokens.forEach(function(t, i){
		next = tokens[i + 1];
		if( prev === '(' && next === ')') {
		  tokens.splice(i - 1, 1);
		  tokens.splice(i, 1);
		}
		prev = t;
	  });
	}
  
	appendExprResult(tokens, start_index) {
	  let slice = tokens.splice(start_index, 3)
	  let result = this.processTokens(slice); 
	  tokens.splice(start_index, 0, result);  
	  this.removeParens(tokens);
	  return result;
	}
  
	input(expr = '') {
	  if( expr === null || !expr.length ) return '';
  
	  let tokens = this.tokenize(expr), result, obj = this, ordered_ops;
	
	  do {
		  ordered_ops = this.getOrderedOps(tokens);
		  ordered_ops.forEach(function(op){
			while( tokens.indexOf(op) != -1 ) {
			  let op_index = tokens.indexOf(op)
			  let start_index = op_index == 0 ? 0 : op_index - 1;
  
			  if( tokens[start_index] === ')' || tokens[start_index + 2] === ')' ||
				  tokens[start_index] === '(' || tokens[start_index + 2] === '(' ) {
				 break;
			  }
  
			  result = obj.appendExprResult(tokens, start_index);
			}
		  });
	  } while( ordered_ops.length );
	  obj.removeParens(tokens);
	  return tokens.length ? obj.processTokens(tokens, true) : result;
	}
};
