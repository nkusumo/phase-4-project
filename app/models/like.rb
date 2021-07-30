class Like < ApplicationRecord
    belongs_to :like_user, :class_name => "User", :foreign_key => "user_id"
    belongs_to :like_song, :class_name => "Song", :foreign_key => "song_id"
end
