class AddSpotifyIdToSongs < ActiveRecord::Migration[6.1]
  def change
    add_column :songs, :spotifyID, :string
  end
end
