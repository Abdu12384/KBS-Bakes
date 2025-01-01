import { Plus, Check, X, User, Wallet } from 'lucide-react'

const transactions = [
  {
    id: "23621510859",
    name: "Nutech Auto Repair",
    logo: "/placeholder.svg?height=48&width=48",
    date: "04 Apr, 2019",
    time: "03:47 pm",
    withdrawal: 220.50,
    deposit: null,
    status: null
  },
  {
    id: "23621510859",
    name: "Refer",
    logo: "/placeholder.svg?height=48&width=48",
    date: "04 Apr, 2019",
    time: "03:47 pm",
    withdrawal: 4230.50,
    deposit: 20,
    status: "success"
  },
  {
    id: "23621510859",
    name: "Add Money to Wallet",
    logo: "/placeholder.svg?height=48&width=48",
    date: "04 Apr, 2019",
    time: "03:47 pm",
    withdrawal: null,
    deposit: 2500.00,
    status: "decline"
  },
  {
    id: "23621510859",
    name: "Vancouver Euro Exotic",
    logo: "/placeholder.svg?height=48&width=48",
    date: "04 Apr, 2019",
    time: "03:47 pm",
    withdrawal: 2190.50,
    deposit: 145.50,
    status: "success"
  }
]

export default function WalletPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Balance Card */}
      <div className="bg-orange-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-4xl font-bold text-orange-400">
              ₹1,550.56
            </div>
            <div className="text-orange-400/80 mt-1">
              Current ProStop Wallet Balance
            </div>
          </div>
          <button className="bg-orange-400 text-white px-6 py-3 rounded-lg flex items-center hover:bg-orange-500 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Add Money to Wallet
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">All Transaction Details</h2>
        
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 bg-gray-600 text-white p-4 rounded-t-lg">
          <div>Shop Name</div>
          <div>Withdrawal</div>
          <div>Deposit</div>
          <div></div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="grid grid-cols-4 gap-4 p-4 items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                  <img 
                    src={transaction.logo} 
                    alt={transaction.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{transaction.name}</div>
                  <div className="text-sm text-gray-500">
                    Transaction ID {transaction.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.date} • {transaction.time}
                  </div>
                </div>
              </div>
              <div className="text-gray-900">
                {transaction.withdrawal ? `₹${transaction.withdrawal.toFixed(2)}` : 'None'}
              </div>
              <div className="text-gray-900">
                {transaction.deposit ? `₹${transaction.deposit.toFixed(2)}` : 'None'}
              </div>
              <div className="flex justify-end">
                {transaction.status === 'success' && (
                  <div className="flex items-center text-green-500">
                    <Check className="w-5 h-5 mr-1" />
                    Success
                  </div>
                )}
                {transaction.status === 'decline' && (
                  <div className="flex items-center text-red-500">
                    <X className="w-5 h-5 mr-1" />
                    Decline
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Money Modal */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg w-80">
        <div className="flex justify-center mb-4">
          <img 
            src="/placeholder.svg?height=100&width=100" 
            alt="Wallet"
            className="w-24 h-24"
          />
        </div>
        <h3 className="text-xl font-semibold text-center mb-4">
          Add Money to your Wallet
        </h3>
        <input
          type="number"
          placeholder="Enter Amount to be Added in Wallet"
          className="w-full p-3 border border-gray-200 rounded-lg mb-4"
        />
        <button className="w-full bg-orange-400 text-white py-3 rounded-lg hover:bg-orange-500 transition-colors">
          Continue
        </button>
      </div>
    </div>
  )
}

