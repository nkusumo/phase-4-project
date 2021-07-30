class Like < ApplicationRecord
    # belongs_to :like_user, :class_name => "User", :foreign_key => "user_id"
    # belongs_to :like_song, :class_name => "Song", :foreign_key => "song_id"
    belongs_to :user
    belongs_to :song

    def with_liker
        {
            id: self.id,
            user: self.user.name,
            song_id: self.song.id
        }
    end
end
