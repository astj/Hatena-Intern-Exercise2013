package LogCounter;
use strict;
use warnings;

sub new {
    my ($class, $logs) = @_;
    return bless { logs => $logs }, $class;
};

sub group_by_user {
    my $self = shift;
    my $groups = {};

    #古典的実装
    # @$self->{logs}だと @$selfでひとまとまりになっちゃうからダメなんですね
    foreach (@{ $self->{logs} }) {
        push(@{$groups->{$_->{user} // 'guest'}}, $_ );
    }

    return $groups;
}

sub count_error {
    my $self = shift;

    # (499,600)よりは[500,599]の方が妥当かな
    return scalar grep {$_->{status} >= 500 && $_->{status} <= 599} @{ $self->{logs} };
}

1;
