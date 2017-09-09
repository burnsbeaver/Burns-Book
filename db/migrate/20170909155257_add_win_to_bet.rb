class AddWinToBet < ActiveRecord::Migration[5.1]
  def change
    add_column :bets, :win, :boolean
  end
end
