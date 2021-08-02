class User < ApplicationRecord
    has_many :posts
    
    has_many :comments, dependent: :destroy
    has_many :comment_posts, through: :comments, source: :post

    has_many :likes, dependent: :destroy
    has_many :like_posts, through: :likes, source: :post
    
    has_secure_password
end
