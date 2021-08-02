class Post < ApplicationRecord
  belongs_to :user
  belongs_to :song
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  def num_likes
    self.likes.count
  end
end
