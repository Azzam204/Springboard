
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({
    amount: 10000,
    years: 10,
    rate: 5,
  })).toEqual('106.07');

  expect(calculateMonthlyPayment({
    amount: 700000,
    years: 7,
    rate: 3.5,
  })).toEqual('9407.90');


});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({
    amount: 254965,
    years: 12,
    rate: 7,
  })).toEqual('2622.01');  
});

/// etc
