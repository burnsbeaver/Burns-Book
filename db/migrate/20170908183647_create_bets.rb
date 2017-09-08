class CreateBets < ActiveRecord::Migration[5.1]
  def change
    create_table :bets do |t|
      t.references :book, foreign_key: true
      t.float :spread
      t.boolean :open
      t.string :team
      t.string :gameID
      t.datetime :start

      t.timestamps
    end
  end
end
