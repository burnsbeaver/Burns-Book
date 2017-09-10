class AddHomeToBet < ActiveRecord::Migration[5.1]
  def change
    add_column :bets, :hometeam, :boolean
  end
end
