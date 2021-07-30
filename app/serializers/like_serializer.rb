class LikeSerializer < ActiveModel::Serializer
  attributes :id, :song_id
  belongs_to :user

  # def user
  #   byebug
  # end
end
