class AddTypeToBet < ActiveRecord::Migration[5.1]
  def change
    add_column :bets, :type, :string
  end
end
