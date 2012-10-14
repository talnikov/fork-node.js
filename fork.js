module.exports = {
	fork: function(code) {
		function ForkedExecutionException() {}

		var executed = false;
		var error, result;

		var caller = function(async, args) {
			if (executed) {
				return result;
			}

			var cb = function(res, err) {
				executed = true;
				error = err;
				result = res;

				// callback executes the conde once again
				code.call(this, caller);
			}

			// adding callback to the function arguments
			args = Array.prototype.slice.call(args);
			args[args.length] = cb;

			// calling function, registering callback
			async.apply(this, args);

			// interrupt further execution, wait for callback
			throw new ForkedExecutionException();
		};


		try {
			code.call(this, caller);
		} catch (e) {
			if (!(e instanceof ForkedExecutionException)) {
				throw e;
			}
		}
	}
}
