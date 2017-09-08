class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.references :user, foreign_key: true
      t.integer :balance
      t.boolean :active
      t.datetime :enddate

      t.timestamps
    end
  end
end
