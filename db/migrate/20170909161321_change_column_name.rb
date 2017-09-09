class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :bets, :type, :oddtype
  end
end
