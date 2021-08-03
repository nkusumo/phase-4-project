class RemoveColumnsFromSongs < ActiveRecord::Migration[6.1]
  def change
    remove_column :songs, :name
    remove_column :songs, :artist
    remove_column :songs, :album
    remove_column :songs, :year
    remove_column :songs, :image
  end
end

