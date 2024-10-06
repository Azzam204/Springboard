function createAccount(initPin, amount = 0) {
  let pin = initPin
  let balance = amount

  return {
    checkBalance(checkPin) {
      if (checkPin === pin) return `$${balance}`
      else return "Invalid PIN."
    },
    deposit(checkPin, depAmount) {
      if (checkPin === pin) {
        balance += depAmount
        return `Succesfully deposited $${depAmount}. Current balance: $${balance}.`
      }
      else return "Invalid PIN."
    },
    withdraw(checkPin, withAmount) {
      if (checkPin === pin) {
        if (withAmount < balance) {
          balance -= withAmount
          return `Succesfully withdrew $${withAmount}. Current balance: $${balance}.`
        }
        else return "Withdrawal amount exceeds account balance. Transaction cancelled."
      }
      else return "Invalid PIN."
    },
    changePin(oldPin, newPin) {
      if (oldPin === pin) {
        pin = newPin
        return `PIN successfully changed!`
      }
      else return "Invalid PIN."
    }
  }
}

module.exports = { createAccount };
