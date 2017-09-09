class AddPayoutToBet < ActiveRecord::Migration[5.1]
  def change
    add_column :bets, :payout, :integer
  end
end
