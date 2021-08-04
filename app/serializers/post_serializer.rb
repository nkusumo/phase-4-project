class PostSerializer < ActiveModel::Serializer
  attributes :id, :likes_count, :username
  # has_one :user
  has_one :song
  has_many :comments
  has_many :likes

  def likes_count
    self.object.num_likes
  end

  def username
    self.object.user.username
  end
end
