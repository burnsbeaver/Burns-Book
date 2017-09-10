class ChangeBooleanFormatInBet < ActiveRecord::Migration[5.1]
  def up
     change_column :bets, :win, :string
   end

   def down
     change_column :bets, :win, :boolean
   end
end
