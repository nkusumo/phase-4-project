class User < ApplicationRecord
    has_many :comments, dependent: :destroy
    # has_many :songs, through: :comments
    has_many :posts, through: :comments

    has_many :likes, dependent: :destroy
    # has_many :like_songs, through: :likes, source: :song
    has_many :like_posts, through: :likes, source: :post
    
    has_secure_password
end
