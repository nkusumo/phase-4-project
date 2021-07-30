class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.string :name
      t.string :artist
      t.string :album
      t.integer :year
      t.string :image

      t.timestamps
    end
  end
end
